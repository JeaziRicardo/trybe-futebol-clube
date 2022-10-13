import Match from '../database/models/MatchModel';
import IPointsAndMatches from '../interfaces/IPointsAndMatches';

const points = (
  acc: IPointsAndMatches,
  goalsOfThisTeam: number,
  goalsOfTheOtherTeam: number,
) => {
  if (goalsOfThisTeam > goalsOfTheOtherTeam) {
    acc.totalPoints += 3;
    acc.totalVictories += 1;
  }
  if (goalsOfThisTeam < goalsOfTheOtherTeam) {
    acc.totalLosses += 1;
  }
  if (goalsOfThisTeam === goalsOfTheOtherTeam) {
    acc.totalPoints += 1;
    acc.totalDraws += 1;
  }
};

const pointsAndMatches = (id: number, matches: Match[]) => matches.reduce((acc, curr) => {
  if (curr.homeTeam === id) {
    points(acc, curr.homeTeamGoals, curr.awayTeamGoals);
  }
  if (curr.awayTeam === id) {
    points(acc, curr.awayTeamGoals, curr.homeTeamGoals);
  }
  acc.totalGames += 1;
  return acc;
}, { totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
});

const goals = (id: number, matches: Match[]) => matches.reduce((acc, curr) => {
  if (curr.homeTeam === id) {
    acc.gF += curr.homeTeamGoals;
    acc.gW += curr.awayTeamGoals;
  }
  if (curr.awayTeam === id) {
    acc.gF += curr.awayTeamGoals;
    acc.gW += curr.homeTeamGoals;
  }
  return acc;
}, { gF: 0, gW: 0 });

const efficiency = (totalPoints: number, totalGames: number) => {
  const pointsEfficiency = (totalPoints / (totalGames * 3)) * 100;
  return pointsEfficiency.toFixed(2);
};

export default {
  pointsAndMatches,
  goals,
  efficiency,
};
