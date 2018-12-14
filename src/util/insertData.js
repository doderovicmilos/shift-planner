import axios from "axios";
import moment from "moment";

for (var i = 1; i < 10; i++) {
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