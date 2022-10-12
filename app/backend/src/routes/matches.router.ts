import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matches = Router();

const matchesController = new MatchesController();

matches.get('/', matchesController.getAll);
matches.post('/', matchesController.create);

export default matches;
