package main 

import (
	"encoding/json"
	basic "go-backend/basic"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request basic.Request)(basic.Response , error) {
	movie_id := request.PathParameters["movie_id"]
	
	fetchedItems , err := basic.GetReviews(movie_id)

	if err != nil {
		return basic.Response{
			Body: err.Error(),
			StatusCode : 400 , 
			Headers : map[string]string{
				"Content-Type" : "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Credentials":  "true",
			},
		}, nil 
	}

	marshalledItem , _ := json.Marshal(fetchedItems)

	return basic.Response{
		Body: string(marshalledItem), 
		StatusCode: 200,
		Headers : map[string]string{
			"Content-Type" : "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Credentials":  "true",
		},
	}, nil
	
}


func main() {
	lambda.Start(handler)

}