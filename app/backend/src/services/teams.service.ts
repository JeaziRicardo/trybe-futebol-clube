import Team from '../database/models/TeamModel';

class TeamsService {
  private _teamsModel = Team;

  async getAll(): Promise<Team[]> {
    const teams = await this._teamsModel.findAll();

    return teams;
  }
}

export default TeamsService;
