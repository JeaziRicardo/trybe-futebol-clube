import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class TeamsController {
  private _teamsService = new TeamsService();

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this._teamsService.getAll();

    return res.status(200).json(teams);
  };
}

export default TeamsController;
