import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

class MatchesService {
  private _matchModel = Match;

  public async getAll(): Promise<Match[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}

export default MatchesService;
