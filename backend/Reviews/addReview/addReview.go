package main

import (
	"fmt"
	"encoding/json"
	basic "go-backend/basic"
	"github.com/aws/aws-lambda-go/lambda"
)


func handler(request basic.Request )(basic.Response , error){
	thisItem , err := basic.AddReview(request.Body) 

	if err != nil {
		return basic.Response{
			Body : err.Error() ,
			StatusCode: 400,
			Headers: map[string]string{
				"Content-Type" : "application/json", 
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Credentials":  "true",
			},
		}, nil
	}
	message := fmt.Sprintf("Added successfully %s", thisItem.Review_id) 
	body , _ := json.Marshal(map[string]interface{}{
		"message" : message ,
	})

	return basic.Response{
		Body : string(body) , 
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type" : "application/json", 
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Credentials":  "true",
		},

	},nil

}

func main() {
	lambda.Start(handler)
}
