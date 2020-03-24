function handleSubmitEmployee(event){
   
    event.preventDefault();
    
    const name = document.querySelector("[name='employeeName']").value;
    const email = document.querySelector("[name='email']").value;
    const identityNr = document.querySelector("[name='identityNumber']").value;
    
    const employee = {name, email, identityNr};

    const employeeList = JSON.parse(window.localStorage.getItem("employeeList")) || [];

    employeeList.push(employee);
  
    window.localStorage.setItem("employeeList", JSON.stringify(employeeList));
    
    event.target.reset;

    updateLists();
}

function handleSubmitMission(event){
    
    event.preventDefault();
    
    const missionName = document.querySelector("[name='missionName']").value;
    const missionDescription= document.querySelector("[name='description']").value;

    const mission = {missionName, missionDescription};

    const missionList = JSON.parse(window.localStorage.getItem("missionList")) || [];

    missionList.push(mission);

    window.localStorage.setItem("missionList", JSON.stringify(missionList));

    event.target.reset;

    updateLists();
}

function addEmployeeToMission(event){

    event.preventDefault();
    
    const missionNameSelect= document.getElementById("select");
    const mission = missionNameSelect.options[missionNameSelect.selectedIndex].text;
    const employeeName = document.getElementById("employeeDropList").innerText;

    const missionAndWorkers = {mission, employeeName};

    const missionAndWorkersList = JSON.parse(window.localStorage.getItem("missionAndWorkersList")) || [];

    missionAndWorkersList.push(missionAndWorkers);

    window.localStorage.setItem("missionAndWorkersList", JSON.stringify(missionAndWorkersList));

    event.target.reset;

    updateLists();
    

}
function handleDragOver(event){
    event.preventDefault();

}
function handleDrop(event){
        let employeeName = event.dataTransfer.getData("text/plain");
        console.log(employeeName);
        
        const divEmployeesEl = document.getElementById("employeesDiv");
        const employeeList = document.getElementById("employeeDropList");
        const newParagraph = document.createElement("div");
        newParagraph.appendChild(document.createTextNode(employeeName+", "));
        employeeDropList.appendChild(newParagraph); 
}
function handleDragStart(event){
    const employeeName = event.target.querySelector("b").innerText;
    event.dataTransfer.setData("text/plain", employeeName)
}

function updateLists(){

    const missionList = JSON.parse(window.localStorage.getItem("missionList")) || [];
    const employeeList = JSON.parse(window.localStorage.getItem("employeeList")) || [];
    const missionAndWorkersList = JSON.parse(window.localStorage.getItem("missionAndWorkersList")) || [];

    const employeeNames = document.getElementById("employeeDropList").innerText;

    const selectEl = document.getElementById("select");
    selectEl.innerHTML = "";
    const divMissionsEl = document.getElementById("missionsDiv");
    divMissionsEl.innerHTML = "";
    const divEmployeesEl = document.getElementById("employeesDiv");
    divEmployeesEl.innerHTML = "";
    const divMissionsWorkersEl = document.getElementById("missionsWorkersDiv");
    divMissionsWorkersEl.innerHTML = "";

    for(i = 0; i < missionList.length; i++){
        
        const newOption = document.createElement("option");
        newOption.appendChild(document.createTextNode(missionList[i].missionName));
        selectEl.appendChild(newOption);
    }
    for(i = 0; i < missionList.length; i++){

        const newMissionDiv = document.createElement("div");
        newMissionDiv.innerText = "Mission: " + missionList[i].missionName + "\n Description: " 
        + missionList[i].missionDescription;
        divMissionsEl.appendChild(newMissionDiv);
    }
    for(i=0; i < missionAndWorkersList.length; i++){
        const newMissionWorkerDiv = document.createElement("div");
        newMissionWorkerDiv.innerHTML = "<b>"+"Mission: "+missionAndWorkersList[i].mission+
        "</b>"+"/n Current workers: "+missionAndWorkersList[i].employeeName;
        divMissionsWorkersEl.appendChild(newMissionWorkerDiv)
    }
    for(i = 0; i < employeeList.length; i++){
        
        const newEmployeeDiv = document.createElement("div");
        newEmployeeDiv.draggable = true;
        newEmployeeDiv.ondragstart = handleDragStart;

        newEmployeeDiv.innerHTML = "Name: "+"<b>"+ employeeList[i].name +"</b>"+ " E-mail: " + employeeList[i].email;
        divEmployeesEl.appendChild(newEmployeeDiv);
    }    
}

updateLists();