import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  private _matchesService = new MatchesService();

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const matches = await this._matchesService.getAll();

    return res.status(200).json(matches);
  };
}

export default MatchesController;
