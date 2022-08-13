// SPDX-License-Identifier: GPL-3.0 
pragma solidity 0.8.7;

//Contract address for testnet
//0xA47Ee440C2cDb906A76D01067779c04782f1821D

contract ChirpingContract {

    event AddChirping(address creator, uint chirpingId, uint256 timestamp, uint level);
    event WingsGiven(uint chirpingId, address creator, address wingsGiver);
    event CagesGiven(uint chirpingId, address creator, address wingsGiver);
    event LevelPromoted(address user, uint currLevel);

    uint public chirpingId;
    uint public userId;

    mapping(uint256=>Chirping) public chirpingMap;
    mapping(address=>User) public usernameToUser;
    mapping(uint=>address) public userIdToUsername;
    
    struct User {
        uint uId;
        address username;
        uint256 totalChirpings;
        uint256 totalWings;
        uint256 totalChirpTokens;
        uint256 level;
        uint256 totalCages;
        uint256 prevTimestamp;
        string name;
        string displayPicture;
        }

    struct Chirping {
        uint chirpingId;
        address creator;
        string chirpingText;
        uint256 timestamp;
        uint256 wings;
        uint256 cages;
        bool hide;
        mapping(address=>bool) wingsGiver;
        mapping(address=>bool) cagesGiver;
        string chirpingImage;
        uint256 creatorLevel;
        }

    struct ChirpingReturn{
        uint chirpingId;
        address creator;
        string chirpingText;
        uint256 timestamp;
        uint256 wings;
        uint256 cages;
        bool hide;
        string chirpingImage;
        uint256 creatorLevel;

    }

    function addChirping(uint _numOfCharacters, string memory _chirpingText, string memory _chirpingImage) public {
        require(checkUser(msg.sender)==true, "Add user");
        User storage creator = usernameToUser[msg.sender];
        require(block.timestamp - creator.prevTimestamp >= timestamp(creator.level), "You have to wait");
        // require(block.timestamp - creator.prevTimestamp >= 5, "You have to wait"); // Change 5 to 86400
        creator.prevTimestamp = block.timestamp;
        uint maxCharNum = maxCharLevel(creator.level);
        require(_numOfCharacters>0 && _numOfCharacters<maxCharNum, "Maximum limit of characters reached");
        Chirping storage currChirping = chirpingMap[chirpingId];
        currChirping.chirpingId = chirpingId;
        currChirping.creator = msg.sender;
        currChirping.chirpingText = _chirpingText;
        currChirping.timestamp = block.timestamp;
        currChirping.wings = 0;
        currChirping.cages = 0;
        currChirping.creatorLevel = creator.level;
        if(creator.level>=5){
        currChirping.chirpingImage = _chirpingImage;
        }
        else{
            currChirping.chirpingImage = "";
        }
        creator.totalChirpings++;
        chirpingId++;
        emit AddChirping(msg.sender, chirpingId, block.timestamp, creator.level);
    }

    function timestamp(uint256 level) public returns (uint256) {
        if(level==0){
            return 86400;
        }
        else if(level==1){
            return 86400;
        }
        else if(level==2){
            return 43200;
        }
        else if(level==3){
            return 43200;
        }
        else if(level==4){
            return 14400;
        }
        else{
            return 86400;
        }
    }

    function addUser(address user, string memory displayPicture) public {
        require(usernameToUser[user].username==address(0), "User already exists");
            string memory _name = "";
            usernameToUser[user] = User(userId, user, 0, 0, 0, 0, 0, 0, _name, displayPicture);
            userIdToUsername[userId] = user;
            userId++;
    }

    function checkUser(address user) public view returns(bool){
        bool success=false;
        for(uint i=0; i<userId; i++)
        {
            if(usernameToUser[user].username==user){
                success=true;
            }
        }
        return success;
    }

    function getAllChirpings() public view returns (ChirpingReturn[] memory) {
        uint trueChirpings = 0;
        for(uint i=0; i<chirpingId ; i++)
        {
            Chirping storage currChirping = chirpingMap[i];
            if(currChirping.hide == false){
                trueChirpings++;
            }

        }
        ChirpingReturn[] memory allChirpings = new ChirpingReturn[] (trueChirpings);
        uint currIndex = 0;
        for(uint i=0; i<chirpingId; i++)
        {
            Chirping storage currChirping = chirpingMap[i];
            if(currChirping.hide == false){
            allChirpings[currIndex].chirpingId = currChirping.chirpingId;
            allChirpings[currIndex].creator = currChirping.creator;
            allChirpings[currIndex].chirpingText = currChirping.chirpingText;
            allChirpings[currIndex].timestamp = currChirping.timestamp;
            allChirpings[currIndex].wings = currChirping.wings;
            allChirpings[currIndex].cages = currChirping.cages;
            allChirpings[currIndex].hide = currChirping.hide;
            allChirpings[currIndex].chirpingImage = currChirping.chirpingImage;
            allChirpings[currIndex].creatorLevel = currChirping.creatorLevel;
            currIndex++;
            }
        }
        return allChirpings;
    }

    function getMyChirpings(address user) public view returns (ChirpingReturn[] memory) {
        uint trueChirpings = 0;
        for(uint i=0; i<chirpingId ; i++)
        {
            Chirping storage currChirping = chirpingMap[i];
            if(currChirping.creator == user && currChirping.hide == false){
                trueChirpings++;
            }

        }
        ChirpingReturn[] memory myChirpings = new ChirpingReturn[] (trueChirpings);
        uint currIndex = 0;
        for(uint i=0; i<chirpingId; i++)
        {
            Chirping storage currChirping = chirpingMap[i];
            if(currChirping.creator == user && currChirping.hide == false){
            myChirpings[currIndex].chirpingId = currChirping.chirpingId;
            myChirpings[currIndex].creator = currChirping.creator;
            myChirpings[currIndex].chirpingText = currChirping.chirpingText;
            myChirpings[currIndex].timestamp = currChirping.timestamp;
            myChirpings[currIndex].wings = currChirping.wings;
            myChirpings[currIndex].cages = currChirping.cages;
            myChirpings[currIndex].hide = currChirping.hide;
            myChirpings[currIndex].chirpingImage = currChirping.chirpingImage;
            myChirpings[currIndex].creatorLevel = currChirping.creatorLevel;
            currIndex++;
            }
           
            
        }
        return myChirpings;
    }

    function getCagedChirpings(address user) public view returns (ChirpingReturn[] memory) {
        uint hiddenChirpings = 0;
        for(uint i=0; i<chirpingId ; i++)
        {
            Chirping storage currChirping = chirpingMap[i];
            if(currChirping.hide == true && currChirping.creator == user){
                hiddenChirpings++;
            }

        }
        ChirpingReturn[] memory myCagedChirpings = new ChirpingReturn[] (hiddenChirpings);
        uint currIndex = 0;
        for(uint i=0; i<chirpingId; i++)
        {
            Chirping storage currChirping = chirpingMap[i];
            if(currChirping.creator == user && currChirping.hide == true){
            myCagedChirpings[currIndex].chirpingId = currChirping.chirpingId;
            myCagedChirpings[currIndex].creator = currChirping.creator;
            myCagedChirpings[currIndex].chirpingText = currChirping.chirpingText;
            myCagedChirpings[currIndex].timestamp = currChirping.timestamp;
            myCagedChirpings[currIndex].wings = currChirping.wings;
            myCagedChirpings[currIndex].cages = currChirping.cages;
            myCagedChirpings[currIndex].hide = currChirping.hide;
            myCagedChirpings[currIndex].chirpingImage = currChirping.chirpingImage;
            myCagedChirpings[currIndex].creatorLevel = currChirping.creatorLevel;
            currIndex++;
            }
           
            
        }
        return myCagedChirpings;
    }

    function numOfCharacters(string memory chirpingText) private pure returns (uint256){
       uint count=0;
       uint length = bytes(chirpingText).length;
       for(uint i=0; i<length ; i++ ){
            if(bytes(chirpingText)[i] != " ")
            {
                count++;
            }
        }
        return count;
        
    }

    function maxCharLevel(uint256 level) private pure returns (uint256){
        uint maxCharNum;
        if(level == 0){
            maxCharNum = 100;
        }
        else if(level == 1){
            maxCharNum = 150;
        }
        else if(level == 2){
            maxCharNum = 200;
        }
        else if(level == 3){
            maxCharNum = 300;
        }
        else if(level == 4){
            maxCharNum = 350;
        }

        return maxCharNum;
    }

    function givingWings(uint _chirpingId) public {
        Chirping storage currChirping = chirpingMap[_chirpingId];
        require(currChirping.creator!=msg.sender, "You cannot give wings to yourself");
        require(currChirping.wingsGiver[msg.sender]==false, "You've already given wings");
        require(currChirping.cagesGiver[msg.sender]==false, "You've already given cage");
        currChirping.wingsGiver[msg.sender] = true;
        currChirping.wings++;
        address creator = currChirping.creator;
        usernameToUser[creator].totalWings++;
        emit WingsGiven(_chirpingId, creator, msg.sender);
    }

    function givingCage(uint _chirpingId) public {
        Chirping storage currChirping = chirpingMap[_chirpingId];
        require(currChirping.creator!=msg.sender, "You cannot give cage to yourself");
        require(currChirping.cagesGiver[msg.sender]==false, "You've already given cage");
        require(currChirping.wingsGiver[msg.sender]==false, "You've already given wings");
        currChirping.cagesGiver[msg.sender] = true;
        if(currChirping.wings<10 && currChirping.cages<10){
            currChirping.cages++;
        }
        else if(currChirping.wings<10 && currChirping.cages>=10){
            currChirping.cages++;
            chirpingMap[_chirpingId].hide = true;
        }
        else if(currChirping.wings>=10 && currChirping.cages>currChirping.wings){
            currChirping.cages++;
            chirpingMap[_chirpingId].hide = true;
        }
        else{
            currChirping.cages++;
        }
        address creator = currChirping.creator;
        usernameToUser[creator].totalCages++;
        emit CagesGiven(_chirpingId, creator, msg.sender);

    }


    function showUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[] (userId);
        uint currIndex = 0;
        for(uint i=0; i<userId; i++)
        {
            User storage currUser = usernameToUser[userIdToUsername[i]];     
            allUsers[currIndex] = currUser;
            currIndex++;
        }
        return allUsers;
    }

    function showCurrUser(address user) public view returns (User memory) {
        return usernameToUser[user];
    }

    function promoteLevel() public {
        User storage user = usernameToUser[msg.sender];
        if((user.totalChirpings>=10 && user.totalChirpings<20) && (user.totalWings>=20) && user.level==0){
            user.level = 1;
          
        }
        else if((user.totalChirpings>=20 && user.totalChirpings<30) && (user.totalWings>=40) && user.level<2){
            user.level = 2;
            
        }
        else if((user.totalChirpings>=30 && user.totalChirpings<50) && (user.totalWings>=60) && user.level<3){
            user.level = 3;
            
        }
        else if((user.totalChirpings>=50 && user.totalChirpings<70) && (user.totalWings>=80) && user.level<4){
            user.level = 4;
            
        }
        else if((user.totalChirpings>=70 && user.totalChirpings<100) && (user.totalWings>=100) && user.level<5){
            user.level = 5;
            
        }
       
    }

    function wingsGivenCheck(uint _chirpingId, address _user) public view returns(bool) {
        Chirping storage currChirping = chirpingMap[_chirpingId];
        if(currChirping.wingsGiver[_user]==true){
            return true;
        }
        else{
            return false;
        }
    }

    function cagesGivenCheck(uint _chirpingId, address _user) public view returns(bool) {
        Chirping storage currChirping = chirpingMap[_chirpingId];
        if(currChirping.cagesGiver[_user]==true){
            return true;
        }
        else{
            return false;
        }
    }

    function addName(string memory _name) public {
         User storage user = usernameToUser[msg.sender];
         require(user.level>=4, "You're not eligible");
         user.name = _name;
    }

    function changeDisplayPicture(string memory _imageURL) public {
        User storage user = usernameToUser[msg.sender];
        require(user.level>=5, "You're not eligible");
        user.displayPicture = _imageURL;
    }


}