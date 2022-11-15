$( document ).ready(function() {
    $('.delete').on('click', function(event) {
		event.stopPropagation();
		tc = $(this);
		var cf = confirm("Are you sure!");
		if (cf == true) {
			url=tc.attr('href');
			$.ajax({
				url: url,
				method: 'post', 
			}).done(
				function( data ) {
					if(data)
						tc.parent().parent().remove();
				},
			);
		}
		return false;
	});
});
