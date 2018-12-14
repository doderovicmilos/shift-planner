import axios from "axios";
import moment from "moment";

for (var i = 10; i < 22; i++) {

    if( i === 15 || i === 16) continue;

    axios({
        method: 'post',
        url: "https://shift-planner-a7968.firebaseio.com/shifts.json",
        data: {
            employeeId: 1,
            startTime: moment().startOf('month').add(i, 'day').add(8, 'hour').unix(),
            endTime: moment().startOf('month').add(i, 'day').add(16, 'hour').unix()
        }
    });
    axios({
        method: 'post',
        url: "https://shift-planner-a7968.firebaseio.com/shifts.json",
        data: {
            employeeId: 2,
            startTime: moment().startOf('month').add(i, 'day').add(10, 'hour').unix(),
            endTime: moment().startOf('month').add(i, 'day').add(18, 'hour').unix()
        }
    });
    axios({
        method: 'post',
        url: "https://shift-planner-a7968.firebaseio.com/shifts.json",
        data: {
            employeeId: 2,
            startTime: moment().startOf('month').add(i, 'day').add(12, 'hour').unix(),
            endTime: moment().startOf('month').add(i, 'day').add(20, 'hour').unix()
        }
    });
}