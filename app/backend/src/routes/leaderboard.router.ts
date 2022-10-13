import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboard.controller';

const leaderBoard = Router();

const leaderBoardController = new LeaderBoardController();

leaderBoard.get('/', leaderBoardController.getLeaderBoard);

export default leaderBoard;
