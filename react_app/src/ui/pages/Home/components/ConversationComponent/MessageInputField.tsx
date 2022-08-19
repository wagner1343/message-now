import {ChangeEvent, useEffect, useState} from "react";
import MessageInput from "src/ui/pages/Home/components/ConversationComponent/MessageInput";
import SendMessageButton from "src/ui/pages/Home/components/ConversationComponent/SendMessageButton";
import {useConversationsProvider} from "src/ui/components/ConversationsProvider";
import {Box, IconButton} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';

const MessageInputField = () => {
    const {sendMessage} = useConversationsProvider();
    const [message, setMessage] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    // needed to clear input type=file
    const [filesInputKey, setFilesInputKey] = useState<string>("input-key");

    useEffect(() => {
        setMessage("");
        setFiles([]);
        setFilesInputKey(Date.now().toString());
    }, []);

    useEffect(() => {
        if (!files.length) {
            setFilesInputKey(Date.now().toString());
        }
    }, [files]);

    const onFilesChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {files: assets} = event.target;
        if (!assets?.length) {
            return;
        }
        setFiles([...files, ...assets]);
    };

    const onFileRemove = (file: string) => {
        const fileIdentity = file.split("_");
        const existentFiles = files.filter(
            ({name, size}) =>
                name !== fileIdentity[0] && size !== Number(fileIdentity[1])
        );

        setFiles(existentFiles);
    };

    const onMessageSend = async () => {
        if (message) {
            await sendMessage({
                body: message
            });
        }

        for (const file of files) {
            const fileData = new FormData();
            fileData.set(file.name, file, file.name);
            await sendMessage({
                body: file.name
            });
        }

        setMessage("");
        setFiles([]);
    };

    return (
        <Box
            style={{
                display: "flex",
                flexBasis: 60,
                flexDirection: "column",
            }}
        >
            <Box
                display="flex"
                flexDirection="row"
                height="100%"
                flexGrow={10}
                paddingBottom="space30"
                paddingTop="space40"
            >
                <Box
                    paddingBottom="space30"
                    paddingLeft="space50"
                    paddingRight="space10"
                    paddingTop="space20"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="start"
                    style={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                    }}
                >
                    <IconButton>
                        <label htmlFor="file-input">
                            <AttachFileIcon/>
                        </label>
                        <input
                            id="file-input"
                            key={filesInputKey}
                            type="file"
                            style={{display: "none"}}
                            onChange={onFilesChange}
                        />
                    </IconButton>
                </Box>
                <Box paddingRight="space50" flexGrow={10}>
                    <MessageInput
                        assets={files}
                        message={message}
                        onChange={(e: string) => {
                            setMessage(e);
                        }}
                        onKeyPress={(e: any) => {
                            if (e.key === "Enter") {
                                onMessageSend();
                            }
                        }}
                        onFileRemove={onFileRemove}
                    />
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="start"
                >
                    {message || files.length ? (
                        <SendMessageButton message={message} onClick={onMessageSend}/>
                    ) : null}
                </Box>
            </Box>
        </Box>
    );
};

export default MessageInputField;
