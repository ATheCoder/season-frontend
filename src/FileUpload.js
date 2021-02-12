import React, {useState} from 'react';

export function FileUploadPage(){
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [predictions, setPredictions] = useState()
    const [real, setReal] = useState()

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('file', selectedFile);

		fetch(
			'http://194.5.192.158:1337',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
                setPredictions(result.predictions)
                setReal(result.real)
			})
			.catch((error) => {
				console.error('Error:', error);
			});
        };
        
            return(
           <div>
                    <input type="file" name="file" onChange={changeHandler} />
                    {isFilePicked ? (
                        <div>
                            <p>Filename: {selectedFile.name}</p>
                            <p>Filetype: {selectedFile.type}</p>
                            <p>Size in bytes: {selectedFile.size}</p>
                            <p>
                                lastModifiedDate:{' '}
                                {selectedFile.lastModifiedDate.toLocaleDateString()}
                            </p>
                        </div>
                    ) : (
                        <p>Select a file to show details</p>
                    )}
                    <div>
                        <button onClick={handleSubmission}>Submit</button>
                    </div>
                    {real && <div>
                        {real}
                    </div>}
                    {predictions && predictions.map((prediction) => <div>{`Prediction for ${prediction[0]} is ${prediction[1]}`}</div>)}
                </div>
            )
	}