'use client';

import { 
    FunctionComponent, 
    useRef,
    useState, 
    MutableRefObject, 
    useEffect 
} from "react";

const FileInput = (props: any) => (
    <input className="hidden" {...props} />
);

interface Props {
    setSelectedFile: (image: File) => void;
    image?: string | undefined,
    isFilePicked: boolean,
    setIsFilePicked: (value: boolean) => void;
}
 
const UploadImage: FunctionComponent<Props> = (props) => {
    async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
        const res: Response = await fetch(dataUrl);
        const blob: Blob | undefined = await res.blob();
        return new File([blob], fileName, { type: 'image/png' });
    }

    useEffect(() => {
        (async () => {
            if (props.image !== '' && props.image !== undefined) {
                props.setSelectedFile(
                    await dataUrlToFile(
                        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/images/${props.image}`,
                        props.image
                    )
                );
                props.setIsFilePicked(true);
                setBase64String(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/images/${props.image}`);
            }  
        })();
    }, [])

    const [base64String, setBase64String] = useState<string>('data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
    const fileRef = useRef() as MutableRefObject<HTMLInputElement>;
    const changeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setBase64String(URL.createObjectURL(ev?.target?.files?.[0] as File));
        props.setSelectedFile(ev?.target?.files?.[0] as File);
        props.setIsFilePicked(true);
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center mb-8">
            <div 
                className="w-52 h-52 border border-black relative cursor-pointer"
                onClick={() => { fileRef.current.click(); }}
            >
                <img
                    className="w-full h-full"
                    src={base64String.toString()}
                />
                <div className="flex justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-40 text-lg font-bold w-full">
                    {props.isFilePicked ? 'Reupload Image' : 'Upload Image'}
                </div>
                <FileInput
                    ref={fileRef}
                    type="file"
                    name="file"
                    onChange={changeHandler}
                    accept='image/*'
                />
            </div>
        </div>
    );
}
 
export default UploadImage;
