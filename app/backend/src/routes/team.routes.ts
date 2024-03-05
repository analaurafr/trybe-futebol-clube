import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get('/', teamController.getAllTeams.bind(teamController));
teamRouter.get('/:id', teamController.getTeamById.bind(teamController));

export default teamRouter;
