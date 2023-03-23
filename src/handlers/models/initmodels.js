// Init teams
const initTeams = (numOfTeams) => {
    const teams = [];
    for (let i = 1; i <= numOfTeams; i++) {
        teams.push({ teamId: i, name: `Team ${i}` });
    }
    return teams;
};

// Init games
const initGames = (numOfGames) => {
    const games = [];
    for (let i = 1; i <= numOfGames; i++) {
        games.push({
            gameId: i,
            name: `Game ${i}`,
            playing: false,
            time: { min: 0, sec: 0, ms: 0 },
            interval: -1,
        });
    }
    return games;
};

// Init times
const initTimes = (numOfTeams, numOfGames) => {
    const times = [];
    for (let i = 1; i <= numOfTeams; i++) {
        for (let j = 1; j <= numOfGames; j++) {
            times.push({
                teamId: i,
                gameId: j,
                playing: false,
                time: { min: 0, sec: 0, ms: 0 },
            });
        }
    }
    return times;
};

export { initTeams, initGames, initTimes };
