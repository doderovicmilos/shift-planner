import axios from "axios";
import moment from "moment";

axios({
    method: 'post',
    url: "https://shift-planner-a7968.firebaseio.com/shifts.json",
    data: {
        employeeId: 1,
        startTime: moment().startOf('day').hours(8).unix(),
        endTime: moment().startOf('day').hours(16).unix()
    }
});

axios({
    method: 'post',
    url: "https://shift-planner-a7968.firebaseio.com/shifts.json",
    data: {
        employeeId: 4,
        startTime: moment().startOf('day').hours(10).unix(),
        endTime: moment().startOf('day').hours(18).unix()
    }
});

axios({
    method: 'post',
    url: "https://shift-planner-a7968.firebaseio.com/shifts.json",
    data: {
        employeeId: 5,
        startTime: moment().startOf('day').hours(12).unix(),
        endTime: moment().startOf('day').hours(20).unix()
    }
});