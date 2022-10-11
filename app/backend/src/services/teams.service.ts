import CustomError from '../erros/customErros';
import Team from '../database/models/TeamModel';

class TeamsService {
  private _teamsModel = Team;

  async getAll(): Promise<Team[]> {
    const teams = await this._teamsModel.findAll();

    return teams;
  }

  public getById = async (id: number): Promise<Team> => {
    const team = await this._teamsModel.findByPk(id);

    if (!team) throw new CustomError(404, 'Not found');

    return team;
  };
}

export default TeamsService;
