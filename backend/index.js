const express = require('express');
const cors = require('cors');
const PORT = 3000;


const Game = require('./Models/Game');

const app = express();


// middleware
app.use(
	cors({
		origin: 'http://localhost:8080',
	})
);

const gameRouter = express.Router();
// TODO: Use database instead of arrays
const games = [];

gameRouter.get('/:gameId', (req, res) => {
	const { gameId } = req.params;

	const game = games[gameId-1];

	if(!game) {
		return res.status(404).json({
			message:"Game not found"
		});
	}

	let result = game.nextRound();

	return res.json({
		result,
	});

});

gameRouter.post('/', (req,res) => {
	const game = new Game();
	let result = game.nextRound();

	games.push(game);

	return res.json({
		result,
		id:games.length
	});
});


app.use('/game', gameRouter);

//sanity check
app.get('/ping',(req,res)=>{
	res.json({
		message:'pong'
	});
})

app.listen(PORT,()=>{
	console.log(`Listening on port ${PORT}`);
});