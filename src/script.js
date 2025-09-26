var id_inc = 0;
var plans = [];
var planGradient = "linear-gradient(to top, rgb(40, 4, 40) 5%, rgb(62, 9, 62) 50%, rgba(0, 0, 0, 0))";
var planShadow = "0mm 2mm 0mm rgb(20, 1, 20)";
var targetGradient = "linear-gradient(to top, rgba(129, 15, 129, 1) 5%, rgba(94, 11, 94, 1) 50%, rgba(0, 0, 0, 0))";
var targetShadow = "0mm 2mm 0mm rgba(65, 1, 65, 1)";
var text = "";
var targetPlan = null;
var target = 0;
var prop = 0;
var prevKey;
var doublePress = false;

class Plan {
    id = 0;
    data = [];
    element = null;
    name = null;
    date = null;
    desc = null;

    constructor() {
        this.id = id_inc++;
        this.data = ["", "", ""];
        this.element = document.createElement("div");
        this.element.setAttribute("class", "plan");
        this.element.setAttribute("id", this.id);
        let nameEl = document.createElement("input");
        let dateEl = document.createElement("input");
        let descEl = document.createElement("input");
        nameEl.setAttribute("class", "name");
        dateEl.setAttribute("class", "date");
        descEl.setAttribute("class", "desc");
        nameEl.setAttribute("placeholder", "What?");
        dateEl.setAttribute("placeholder", "When?");
        descEl.setAttribute("placeholder", "Tell me more...");
        nameEl.setAttribute("type", "text");
        dateEl.setAttribute("type", "text");
        descEl.setAttribute("type", "text");
        this.element.appendChild(nameEl);
        this.element.appendChild(dateEl);
        this.element.appendChild(descEl);
        this.name = nameEl;
        this.date = dateEl;
        this.desc = descEl;
    }

    exitPlan() {
        this.element.style.backgroundImage = planGradient;
        this.element.style.boxShadow = planShadow;
        for (let input of this.element.children) {
            input.setAttribute("readonly", "");
        }
    }

    enterPlan() {
        this.element.style.backgroundImage = targetGradient;
        this.element.style.boxShadow = targetShadow;
        for (let input of this.element.children) {
            input.removeAttribute("readonly");
        }
    }
}

function addPlan() {
    let plan = new Plan();
    plans.push(plan);
    document.querySelector("#plans").appendChild(plan.element);
}

function changeTarget(idx) {
    console.log(idx);
    if (idx < 0 || plans.length <= idx) return;
    plans[target].exitPlan();
    plans[idx].enterPlan();
    target = idx;
    targetPlan = plans[target];
}

function moveTarget(idx) {
    if (idx < 0 || plans.length <= idx || plans.length == 1) return;
    let temp = plans[target];
    let swapElement = plans[idx];
    plans[target] = plans[idx];
    plans[idx] = temp;
    target = idx;
    changeTarget(idx);
}

function relocatePlans() {
    let plansDiv = document.querySelector("#plans");
    let planElements = [];
    while (plansDiv.children.length > 0) {
        plansDiv.removeChild(plansDiv.firstChild);
    }
    for (let plan of plans) plansDiv.appendChild(plan.element);
}

function keydown(e) {
    doublePress = (e.key == prevKey && !doublePress);
    if (e.key == "ArrowUp") 
    {
        if (e.ctrlKey) moveTarget(target-1);
        else changeTarget(target-1);
        relocatePlans();
        targetPlan.name.focus();
    } else if (e.key == "ArrowDown") 
    {
        if (e.ctrlKey) moveTarget(target+1);
        else changeTarget(target+1);
        relocatePlans();
        targetPlan.name.focus();
    } else if (e.key == "Enter" && doublePress)     
    {
        addPlan();
        changeTarget(plans.length-1);
        targetPlan.name.focus();
    }
    prevKey = e.key;
}

function download() {
    const file = new File(["Hello World"], { type:"text/txt"});
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "plan.txt";
    link.click();
    URL.revokeObjectURL(url);
}

window.onkeydown = keydown;