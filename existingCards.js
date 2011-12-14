var existingCards = new Array();
var numCards = 0;

function cardAdded(cardID)
{
    existingCards[numCards] = cardID;
    numCards++;
}

function cardExists(cardID)
{
    return (existingCards.indexOf(cardID) != -1);
}

function cardRemoved(cardID)
{
    if(cardExists(cardID))
    {
        existingCards.splice(existingCards.indexOf(cardID), 1);
    }
}