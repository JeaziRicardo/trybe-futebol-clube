import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import calculate from '../helpers/calculate.helper';
import ITeam from '../interfaces/ITeam';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import IPointsAndMatches from '../interfaces/IPointsAndMatches';
import order from '../helpers/order.helper';

class LeaderBoardService {
  private _teamModel = Team;
  private _matchModel = Match;

  async getAll() {
    const teams = await this._teamModel.findAll();
    const matches = await this._matchModel.findAll({ where: { inProgress: false } });
    return { teams, matches };
  }

  static filterTeamMatches(id: number, matches: Match[]): Match[] {
    const matchesOfThisTeam = matches
      .filter(({ homeTeam, awayTeam }) => homeTeam === id || awayTeam === id);
    return matchesOfThisTeam;
  }

  static createTeamBoard(
    team: ITeam,
    PAM: IPointsAndMatches,
    goals: { gF: number, gW: number },
  ) {
    return {
      name: team.teamName,
      totalPoints: PAM.totalPoints,
      totalGames: PAM.totalGames,
      totalVictories: PAM.totalVictories,
      totalDraws: PAM.totalDraws,
      totalLosses: PAM.totalLosses,
      goalsFavor: goals.gF,
      goalsOwn: goals.gW,
      goalsBalance: goals.gF - goals.gW,
      efficiency: calculate
        .efficiency(PAM.totalPoints, PAM.totalGames),
    };
  }

  static teamScore(team: ITeam, matches: Match[]) {
    const teamMatches = LeaderBoardService.filterTeamMatches(team.id, matches);
    const pointsAndMatches = calculate.pointsAndMatches(team.id, teamMatches);
    const goals = calculate.goals(team.id, teamMatches);
    return LeaderBoardService.createTeamBoard(team, pointsAndMatches, goals);
  }

  async getLeaderBoard(): Promise<ILeaderBoard[]> {
    const { teams, matches } = await this.getAll();
    const board = teams.map((team) => LeaderBoardService.teamScore(team, matches));
    const sorted = order(board);
    return sorted;
  }
}

export default LeaderBoardService;
