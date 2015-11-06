function taxt_simdom()
{
}

function simdom_log(s)
{
    // console.log(s);
}

taxt_simdom.prototype = {
    MaterialCB11: [],
    MaterialCB21: [],
    MaterialCB31: [],
    MaterialCB41: [],
    SystemCB11: [],
    SystemCB21: [],
    MaterialCB12: [],
    MaterialCB22: [],
    MaterialCB32: [],
    MaterialCB42: [],
    SystemCB12: [],
    SystemCB22: [],
    HeightCB1: [],
    HeightCB2: [],
    HeightCB3: [],
    HeightCB4: [],
    DateCB1: [],
    OccupancyCB1: [],
    OccupancyCB2: [],
    PositionCB: [],
    PlanShapeCB: [],
    RegularityCB1: [],
    RegularityCB2: [],
    RegularityCB4: [],
    RegularityCB3: [],
    RegularityCB5: [],
    WallsCB: [],
    RoofCB1: [],
    RoofCB2: [],
    RoofCB3: [],
    RoofCB5: [],
    RoofCB4: [],
    FloorCB1: [],
    FloorCB2: [],
    FloorCB3: [],
    FoundationsCB: ['hurry'],
    OutTypeCB: [],
    DirectionCB: null,
    Direction1RB1: null,
    Direction1RB2: null,
    Direction2RB1: null,
    Direction2RB3: null,
    noStoreysE11: "",
    noStoreysE12: "",
    noStoreysE21: "",
    noStoreysE22: "",
    noStoreysE31: "",
    noStoreysE32: "",
    noStoreysE41: "",
    DateE1: "",
    DateE2: "",
    resultE: "",
    permalink: null,

/*
    main_content_parent: null,
    main_content_1: null,
    sub1_content_1: null,
    sub1_content_2: null,
    main_content_2: null,
    main_content_3: null,
    main_content_4: null,
*/

    __radiobuttons: { sub1_xdir: { curr_item: "" ,
                                   items: [ "Direction1RB1", "Direction1RB2" ]},
                      sub1_ydir: { curr_item: "",
                                   items: [ "Direction2RB1", "Direction2RB3" ]}
                    },

}

var simDOM = new taxt_simdom();
simdom_log(simDOM);

function sim_dollar_cls(filter)
{
    this.filter = filter;
}

sim_dollar_cls.prototype = {
    filter: null,

    on: function(event, cb)
    {
        var name = this.filter[0].substring(1);
        simDOM['__on' + event][name] = cb;
    },
    append: function(content)
    {
        var name = this.filter[0].substring(1);
        simDOM[name].push(content);
    },
    prop: function(prop)
    {
        var name = this.filter[0].substring(1);

        if (this.filter.length > 1) {
            simdom_log("WARNING: TODO");
            return true;
        }
        simdom_log("Prop called " + name);
        if (prop == "checked") {
            if (arguments.length > 1) {
                value = arguments[1];
                for (var k in simDOM.__radiobuttons) {
                    rb = simDOM.__radiobuttons[k];
                    if (rb.items.indexOf(name) != -1) {
                        if (value) {
                            rb.curr_item = name;
                        }
                        else {
                            rb.curr_item = "";
                        }
                        break;
                    }
                }
                if (name in simDOM) {
                    simDOM[name] = value;
                }

                if (name in simDOM.__onchange && simDOM.__onchange[name] != null) {
                    simDOM.__onchange[name]();
                }
                    
            }
            else {
                for (var k in simDOM.__radiobuttons) {
                    rb = simDOM.__radiobuttons[k];
                    if (rb.items.indexOf(name) != -1) {
                        return (rb.curr_item == name);
                    }
                }
            }
        }
    },
    val: function()
    {
        var is_set = false;
        var value, i;

        if (arguments.length == 1) {
            is_set = true;
            value = arguments[0];
        }

        var name = this.filter[0].substring(1);
        var is_found = false;
        if (name in simDOM) {
            if (simDOM[name] && simDOM[name].constructor == Array) {

                if (is_set) {
                    simdom_log("Val called: " + name);
                    for (i = 0 ; i < simDOM[name].length ; i++) {
                        if (simDOM[name][i].indexOf('<option value="' + value + '"') == 0) {
                            is_found = true;
                            break;
                        }
                    }
                    if (is_found == false) {
                        simdom_log("Option not found " + name + " val: " + value + " FIRST: " + simDOM[name]);
                        throw 123;
                        return false;
                    }
                    simDOM[name + "_cur"] = value;
                }
                else {
                    return (simDOM[name + "_cur"]);
                }
            }
            else {
                if (is_set) {
                    simDOM[name] = value;
                }
                else {
                    return (simDOM[name]);
                }
            }
        }
        else {
            simdom_log("NOT YET IMPLEMENTED 2 " + name);
        }
    },
    empty: function()
    {
        var name = this.filter[0].substring(1);

        simdom_log("Empty called: " + name);

        if (name in simDOM) {
            if (simDOM[name] && simDOM[name].constructor == Array) {
                simDOM[name] = [];
                if (name + "_cur" in simDOM) {
                    delete simDOM[name + "_cur"];
                }
            }
            else if (typeof(simDOM[name]) == "string") {
                simDOM[name] = "";
            }
        }
        else {
            simdom_log("WARNING: empty called not found " + name);
        }
    },
    removeClass: function()
    {
        simdom_log("removeClass called");
    },
    addClass: function()
    {
        simdom_log("addClass called");
    },
    css: function()
    {
        simdom_log("css called");
    },
    attr: function(obj, value)
    {
        simdom_log("attr called");
    },
}

var sim_dollar = function(filter_in)
{
    var filter = filter_in.split(" ");
    if (filter.length > 1) {
        simdom_log("WARNING: complex filter!! [" + filter_in + "]");
    }
    var cls = new sim_dollar_cls(filter);

    return cls;
}

