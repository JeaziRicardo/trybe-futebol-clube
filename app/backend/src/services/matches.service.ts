import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { IMatch } from '../interfaces/IMatch';
import validate from '../middlewares/validate.middleware';
import CustomError from '../erros/customErros';

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

  public async create(match: IMatch, token: string | undefined): Promise<Match> {
    if (!token) throw new CustomError(404, 'Token not found');

    await validate.match([match.homeTeam, match.awayTeam], token);

    const matchData = await this._matchModel.create(match);

    return matchData;
  }

  public async finished(id: number): Promise<string> {
    await this._matchModel.update({ inProgress: false }, { where: { id } });

    const message = 'Finished';

    return message;
  }
}

export default MatchesService;
