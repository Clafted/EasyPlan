var planColor = "rgb(62, 9, 62)";
var targetColor = "rgb(162, 109, 162)";
var text = "";
var target = 0;
var plans = [];
var prevKey;
var doublePress = false;

class Plan {
    name = "";
    description = "";
    date = "";

    constructor(name, description, date) {
        this.name = name;
        this.description = description;
        this.date = date;
    }

    getInnerHTML() {
        return "<h1 class=\"name\">" + this.name + "</h1>"
                + "<h3 class=\"date\">Date: " + this.date + "</h2>"
                + "<p class=\"desc\">" + this.description + "</p>"
    }
}

function addPlan(plan) {
    currentPlans = document.getElementById("plans");
    currentPlans.innerHTML += "<div id=\"plan" + plans.length + "\">" + plan.getInnerHTML() + "</div>";
    plans.push(plan);
    changeTarget(plans.length-1);
}

function changeTarget(idx) {
    document.getElementById("plan" + target).style.backgroundColor = planColor;
    target = Math.min(plans.length-1, Math.max(0, idx));
    text = plans[target].description;
    document.getElementById("plan" + target).style.backgroundColor = targetColor;
    window.scrollTo(0, document.getElementById("plan" + target).getBoundingClientRect().y); 
}

function keydown(e) {
    doublePress = (e.key == prevKey && !doublePress);
    if (e.key == "Backspace") text = text.slice(0, -1);
    else if (e.key == "ArrowUp") changeTarget(target-1);
    else if (e.key == "ArrowDown") changeTarget(target+1);
    else if (e.key == "Enter" && doublePress)     
    {
        addPlan(new Plan("Event " + plans.length, "", "DD/MM"));
        text = "";
        target = plans.length - 1;
    } 
    else if (plans.length > 0 && e.key.length == 1) 
    {
        text += e.key;
        plans[target].description = text;
        document.getElementById("plan" + target).innerHTML = plans[target].getInnerHTML();
    }
    prevKey = e.key;
}

window.onkeydown = keydown;