export default function getNewRandomNumber({range}: {range: {min: number, max: number}}): number {
	return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
}
