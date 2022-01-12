// IMPORT MODULES under test here:
import { renderParticipant } from '../workshops.js';

const { skip } = QUnit;

skip('renderParticipant(participant)', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = true;

    const participant = { name: 'Kiko', id: 5 };
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderParticipant(participant);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual, expected);
});
