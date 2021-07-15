const Result = {
	0: "Benign",
	1: "Malignant"
};


let model;

$("#image-selector").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
		$("#prediction-output").empty();
	}

	let file = $("#image-selector").prop('files')[0];
	reader.readAsDataURL(file);
});

$(document).ready(async function () {
	$('.progress-bar').show();
	model = await tf.loadLayersModel('/js/weights/model.json');
	$('.progress-bar').hide();
});
$("#predictBtn").click(async function () {
	let image = $('#selected-image').get(0);
	let pre_image = tf.browser.fromPixels(image, 3).resizeNearestNeighbor([50, 50]).toFloat().expandDims();
	let predict_result = await model.predict(pre_image).data();
	console.log("Prediction : " + predict_result);
	let result = [];
	for(let i = 0; i < predict_result.length; i++) {
		result.push({
			"probability": predict_result[i],
			"class": Result[i]
		});
	}
	result.sort(function(a, b) {
		return b.probability - a.probability;
	});
	$("#prediction-output").empty();
	if(result[0].class === "Benign"){
		$("#prediction-output").append(`
		<div class="card w-75">
  			<div class="card-body">
    			<h5 class="card-title">Benign</h5>
    			<p class="card-text">We can say with ${parseInt(Math.trunc(result[0].probability * 100))}% certainity, that you do not have breast cancer. 
				However, better safe than sorry - book an online consultation with the best medical professionals today.</p>
    			<a href="/doctors" class="btn bg-sunglow">Find Doctors</a>
  			</div>
		</div>`);
	} else {
		$("#prediction-output").append(`
		<div class="card w-75">
  			<div class="card-body">
    			<h5 class="card-title">Malignant</h5>
    			<p class="card-text">We can say with ${parseInt(Math.trunc(result[0].probability * 100))}% certainity, that you may have breast cancer. 
				However, better safe than sorry - book an online consultation with the best medical professionals today.</p>
    			<a href="/doctors" class="btn bg-sunglow">Find Doctors</a>
  			</div>
		</div>`);
	}	
});