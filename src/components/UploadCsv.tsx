import { ChangeEvent } from "react";


const UploadCsv = () => {
    //posting the csv file to api, for data parsing
    const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        if (event.target.files[0]) {
            formData.append("csvFile", event.target.files[0]);
        }
        console.log(event.target.files)
        // const config = {
        //     headers: {
        //         "content-type": "multipart/form-data",
        //     },
        // };
        // fetch({
        //     method: "post",
        //     url: "myurl",
        //     data: formData,
        //     headers: { "Content-Type": "multipart/form-data" },
        // })
        //     .then(function (response) {
        //         //handle success
        //         console.log(response);
        //     })
        //     .catch(function (response) {
        //         //handle error
        //         console.log(response);
        //     });
    };

    return(
        <div>
            <form>
                <input
                    type="file"
                    name="file"
                    id="exampleFile"
                    onChange={(e) => fileHandler(e)}/>
            </form>
        </div>
    )
}

export default UploadCsv