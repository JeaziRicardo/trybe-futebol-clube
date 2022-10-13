import ILeaderBoard from '../interfaces/ILeaderBoard';

const totalPoints = (teamOne: ILeaderBoard, teamTwo: ILeaderBoard) => {
  switch (true) {
    case (teamOne.totalPoints > teamTwo.totalPoints):
      return -1;
    case (teamOne.totalPoints < teamTwo.totalPoints):
      return 1;
    default:
      return 0;
  }
};

const victories = (teamOne: ILeaderBoard, teamTwo: ILeaderBoard) => {
  switch (true) {
    case (teamOne.totalVictories > teamTwo.totalVictories):
      return -1;
    case (teamOne.totalVictories < teamTwo.totalVictories):
      return 1;
    default:
      return 0;
  }
};

const goalsBalance = (teamOne: ILeaderBoard, teamTwo: ILeaderBoard) => {
  switch (true) {
    case (teamOne.goalsBalance > teamTwo.goalsBalance):
      return -1;
    case (teamOne.goalsBalance < teamTwo.goalsBalance):
      return 1;
    default:
      return 0;
  }
};

const goalsFavor = (teamOne: ILeaderBoard, teamTwo: ILeaderBoard) => {
  switch (true) {
    case (teamOne.goalsFavor > teamTwo.goalsFavor):
      return -1;
    case (teamOne.goalsFavor < teamTwo.goalsFavor):
      return 1;
    default:
      return 0;
  }
};

const goalsOwn = (teamOne: ILeaderBoard, teamTwo: ILeaderBoard) => {
  switch (true) {
    case (teamOne.goalsOwn > teamTwo.goalsOwn):
      return -1;
    case (teamOne.goalsOwn < teamTwo.goalsOwn):
      return 1;
    default:
      return 0;
  }
};

const total = (teamOne: ILeaderBoard, teamTwo: ILeaderBoard) => {
  if (teamOne.totalPoints !== teamTwo.totalPoints) {
    return totalPoints(teamOne, teamTwo);
  }
  if (teamOne.totalVictories !== teamTwo.totalVictories) {
    return victories(teamOne, teamTwo);
  }
  if (teamOne.goalsBalance !== teamTwo.goalsBalance) {
    return goalsBalance(teamOne, teamTwo);
  }
  if (teamOne.goalsFavor !== teamTwo.goalsFavor) {
    return goalsFavor(teamOne, teamTwo);
  }
  if (teamOne.goalsOwn !== teamTwo.goalsOwn) {
    return goalsOwn(teamOne, teamTwo);
  }
  return 0;
};

const order = (board: ILeaderBoard[]) => {
  const newBoard = board.sort((teamOne, teamTwo) => total(teamOne, teamTwo));
  return newBoard;
};

export default order;
