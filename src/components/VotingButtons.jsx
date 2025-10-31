import React,{ useState } from 'react';
import "./VotingButtons.css";


function VotingButtons({initialScore,initialLikes}){
    const[score,Setscore]=useState(initialScore);
    const[voteStatus,SetvoteStatus]=useState(initialLikes);


    //for upvoting function
    const handleupVote=()=>{
        if (voteStatus===true){
            //already voted => undo the vote
            SetvoteStatus(null);
            Setscore(score-1);
        }
        else if(voteStatus===false){
            //if downvoted => upvote...+1 to undo downvote and +1 for upvote
            SetvoteStatus(true);
            Setscore(score+2);
        }
        else{
            //upvote
            SetvoteStatus(true);
            Setscore(score+1);
        }
    };

    //for downvoting function
    const handledownVote=()=>{
        if(voteStatus===true){
            //if upvoted => change to downvoted....-1 for undo upvote and -1 for again downvote
            SetvoteStatus(false);
            Setscore(score-2);
        }
        else if(voteStatus===false){
            // if already downvoted => undo it
            SetvoteStatus(null);
            Setscore(score+1);
        }
        else{
            //downvote
            SetvoteStatus(false);
            Setscore(score-1);
        }
    };

    const upVoteClass=`vote-btn ${voteStatus===true?'upvoted':''}`;
    const downVoteClass=`vote-btn ${voteStatus===false?'downvoted':''}`;

    //Following is the JSX format that the component shows
    return(
        <div className="vote-container">
            <button className={upVoteClass} onClick={handleupVote}>👍</button>
            <span className="score">{score}</span>

            <button className={downVoteClass} onClick={handledownVote}> 👎</button>
        </div>
    );
}
export default VotingButtons;
