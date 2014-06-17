'use strict';

var board;

describe('Backgammon', function () {

    beforeEach(function () {
        board = new Backgammon.Board('board');
    });

    it('should initialise a standard starting board', function () {
        expect(board.getPip(24)[Backgammon.CONSTANTS.RED]).toBe(2);
        expect(board.getPip(24)[Backgammon.CONSTANTS.BLACK]).toBe(0);
    });
    
    it('should detect illegal and legal moves for Red', function () {

        // test for Red
        expect(board.getPip(24)[Backgammon.CONSTANTS.RED]).toBe(2);

        var isLegal1 = board.testMoveCounter(24, 6);
        expect(isLegal1).toBe(true);
        var isLegal2 = board.testMoveCounter(24, 5);
        expect(isLegal2).toBe(false); // end pip is blocked

        var isLegal3 = board.testMoveCounter(23, 1);
        expect(isLegal3).toBe(false); // start pip contains no counter

    });

    it('should detect illegal and legal moves for Black', function () {

        // test for Black
        expect(board.getPip(1)[Backgammon.CONSTANTS.BLACK]).toBe(2);
        var isLegal1 = board.testMoveCounter(1, 6);
        expect(isLegal1).toBe(true);
        var isLegal2 = board.testMoveCounter(1, 5);
        expect(isLegal2).toBe(false); // end pip is blocked

        var isLegal3 = board.testMoveCounter(2, 1);
        expect(isLegal3).toBe(false); // start pip contains no counter

    });

    it('should be able to move a Red counter', function () {

        expect(board.getPip(24)[Backgammon.CONSTANTS.RED]).toBe(2);
        expect(board.getPip(18)[Backgammon.CONSTANTS.RED]).toBe(0);
        var legal = board.moveCounter(24, 6);
        expect(legal).toBe(true);
        expect(board.getPip(24)[Backgammon.CONSTANTS.RED]).toBe(1);
        expect(board.getPip(18)[Backgammon.CONSTANTS.RED]).toBe(1);

    });


    it('should be able to move a Black counter', function () {
        
        expect(board.getPip(17)[Backgammon.CONSTANTS.BLACK]).toBe(3);
        expect(board.getPip(19)[Backgammon.CONSTANTS.BLACK]).toBe(5);
        var legal = board.moveCounter(17, 2);
        expect(legal).toBe(true);
        expect(board.getPip(17)[Backgammon.CONSTANTS.BLACK]).toBe(2);
        expect(board.getPip(19)[Backgammon.CONSTANTS.BLACK]).toBe(6);

    });


    it('should put Black on the bar when Red hits it', function () {

        // move Black to 22
        board.moveCounter(17, 5);
        // move Red to 22
        board.moveCounter(24, 2);
        expect(board.getPip(22)[Backgammon.CONSTANTS.BLACK]).toBe(0);
        expect(board.getPip(22)[Backgammon.CONSTANTS.RED]).toBe(1);

        expect(board.getPip(Backgammon.CONSTANTS.BAR)[Backgammon.CONSTANTS.BLACK]).toBe(1);

        // now Black cannot make any moves except from the bar:
        expect(board.testMoveCounter(17, 5)).toBe(false);
        expect(board.testMoveCounter(17, 6)).toBe(false);
        expect(board.testMoveCounter(Backgammon.CONSTANTS.BAR, 6)).toBe(false);
        expect(board.testMoveCounter(Backgammon.CONSTANTS.BAR, 5)).toBe(true);
        expect(board.testMoveCounter(Backgammon.CONSTANTS.BAR, 1)).toBe(true);
        
        // do the move
        expect(board.moveCounter(Backgammon.CONSTANTS.BAR, 1)).toBe(true);

    });

});
