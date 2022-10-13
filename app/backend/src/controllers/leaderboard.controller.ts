import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

class LeaderBoardController {
  private _lBService = new LeaderBoardService();

  public getLeaderBoard = async (_req: Request, res: Response): Promise<Response> => {
    const board = await this._lBService.getLeaderBoard();
    return res.status(200).json(board);
  };
}

export default LeaderBoardController;
