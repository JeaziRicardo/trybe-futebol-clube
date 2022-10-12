import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matches = Router();

const matchesController = new MatchesController();

matches.get('/', matchesController.getAll);
matches.post('/', matchesController.create);
matches.patch('/:id/finish', matchesController.finished);

export default matches;
