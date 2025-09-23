var planGradient = "linear-gradient(to top, rgb(62, 9, 62) 60%, rgb(241, 220, 249))";
var targetGradient = "linear-gradient(to top, rgba(100, 71, 119, 1) 20%, rgb(241, 220, 249))";
var text = "";
var target = 0;
var prop = 0;
var plans = [];
var prevKey;
var doublePress = false;

class Plan {
    id = 0;
    data = ['', '', ''];
    element = 0;

    constructor(id) {
        this.id = id;
        this.element = document.createElement("div");
        let name = document.createElement("h1");
        let date = document.createElement("h2");
        let desc = document.createElement("p");
        let idx = document.createElement('h3');
        name.className = 'name';
        date.className = 'date';
        desc.className = 'desc';
        idx.className = 'idx';
        this.element.appendChild(name);
        this.element.appendChild(date);
        this.element.appendChild(desc);
        this.element.appendChild(idx);
    }
}


function addPlan(plan) {
    plans.push(plan);
    document.querySelector("#plans").appendChild(plan.element);
    enterProp(0);
}

function exitPlan(planDiv) {
    planDiv.style.backgroundImage = planGradient;
    prop = 0;
        
}

function enterPlan(planDiv) {
    planDiv.style.backgroundImage = targetGradient;
}

function enterProp(idx) {
    let plan = document.getElementById("plans").children[target];
    plan.children[prop].style.backgroundColor = "rgb(50, 6, 50)";
    prop = idx;
    text = plan.children[prop].innerHTML;
    plan.children[prop].style.backgroundColor = "rgb(21, 2, 21)";
}

function changeTarget(idx) {
    prop = 0;
    planElements = document.querySelector("#plans").children;
    exitPlan(planElements[target]);
    target = Math.min(plans.length-1, Math.max(0, idx));
    text = plans[target].data[prop];
    window.scrollTo(0, planElements[target].getBoundingClientRect().y);
    enterPlan(planElements[target]);
}

function moveTarget(idx) {
    if (idx < 0 || plans.length-1 < idx) return;
    plans[idx].element.insertAdjacentElement((target < idx) ? 'afterend' : 'beforebegin', 
                                                plans[target].element);
    let temp = plans[target];
    plans[target] = plans[idx];
    plans[idx] = temp;
    changeTarget(idx);
}


function keydown(e) {
    doublePress = (e.key == prevKey && !doublePress);
    
    if (e.key == "ArrowUp") {
        if (e.ctrlKey) moveTarget(target-1);
        else changeTarget(target-1);
    } else if (e.key == "ArrowDown") {
        if (e.ctrlKey) moveTarget(target+1);
        else changeTarget(target+1);
    }
    else if (e.key == "Tab") {
        e.preventDefault();
        enterProp((prop+1)%3);
    }
    else if (e.key == "Enter" && doublePress)     
    {
        addPlan(new Plan(plans.length));
        changeTarget(plans.length-1);
    } else if (document.getElementById("plans").children.length > 0) 
    {
        if (e.key == "Backspace") text = text.slice(0, -1);
        else if (e.key == "Enter") text += '\n';
        else text += e.key;
        plans[target].data[prop] = text;
        document.getElementById("plans")
                .children[target]
                .children[prop]
                .innerHTML = text;
    }
    prevKey = e.key;
}

window.onkeydown = keydown;