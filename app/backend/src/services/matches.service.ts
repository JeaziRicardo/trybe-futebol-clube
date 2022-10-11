import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

class MatchesService {
  private _matchModel = Match;

  public async getAll(inProgress: string): Promise<Match[]> {
    const matchesAll = await this._matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    const matchesInProgress = await this._matchModel.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    if (!inProgress) return matchesAll;

    return matchesInProgress;
  }
}

export default MatchesService;
