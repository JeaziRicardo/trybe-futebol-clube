import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  private _matchesService = new MatchesService();

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query as { inProgress: string };

    const matches = await this._matchesService.getAll(inProgress);

    return res.status(200).json(matches);
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { authorization: token } = req.headers;
    const match = await this._matchesService.create(req.body, token);

    return res.status(201).json(match);
  };

  public finished = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const message = await this._matchesService.finished(+id);

    return res.status(200).json({ message });
  };

  public upScore = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const message = await this._matchesService.upScore(+id, req.body);

    return res.status(200).json({ message });
  };
}

export default MatchesController;
