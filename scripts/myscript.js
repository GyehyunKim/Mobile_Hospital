$(document).on("pagebeforeshow", "#hospital", function() {
	$.getJSON("json1.json", function (data) {
        
		start = data.GroupInfo.members;
        
		for (x = 0; x < start.length; x++) {
            
            $("ul li a:eq(" + x + ")").append(
            "<img src='images/" + start[x].studentPic + "' width='50'>");
            
			$("#info" + x).append(	
							"<p>First Name: " + start[x].firstName + "</p>" +
                            "<p>Last Name: " + start[x].lastName + "</p>" +
                            "<p>Student Login: " + start[x].studentLogin + "<p>" +
                            "<p>Student Number: " + start[x].studentNum + "</p>");
        }

	});
});
