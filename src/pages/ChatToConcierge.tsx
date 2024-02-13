//react
import { useState } from 'react';

import { useNavigate } from 'react-router';

// @mui
import { Box, Grid, IconButton, styled, TextField, Typography } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons and images
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AttachIcon from 'src/assets/svg/attach_icon';
import ChatRecieverIcon from 'src/assets/svg/chat_reciever_icon';
import ChatToConceirgeBG from 'src/assets/images/ChatToConceirgeBG.png';
import MicrophoneIcon from 'src/assets/svg/microphone_icon';

// components
import Page from 'src/components/Page';

// styles
import { CustomChip } from 'src/components/pages/payment/UpcomingPayment';
import { Wrapper } from 'src/components/auth/styledComponents/styles';

//constants
import { ChatSuggestions } from 'src/utils/constant';

//.................................................................

const InnerWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '600px',
  height: '600px',
  padding: theme.spacing(4.5),
  backgroundColor: theme.palette.grey[900],
  borderRadius: '1rem',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    height: '99vh',
  },
}));

const ChatView = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'scroll',
  paddingRight: theme.spacing(1),
  '::-webkit-scrollbar': {
    width: '2px',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '15px',
    background: theme.palette.grey[400],
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.grey[500],
  },
}));

const ChatInput = styled(TextField)(({ theme }) => ({
  background: theme.palette.grey[600],
  borderRadius: '30px',
  width: '100%',
  '& fieldset': {
    border: 'none',
  },
  '& input::placeholder': {
    color: '#707070',
  },
}));

function RecieveChatText({ message }: { message: string }) {
  return (
    <Box display="flex" mb={3}>
      <ChatRecieverIcon />
      <Box ml={1} width={{ xs: '100%', sm: 300 }}>
        <Box mb={1} textAlign="left" bgcolor="grey.700" p="12px 16px 12px 16px" borderRadius="8px">
          <Typography color="grey.400" variant="body2">
            {message}
          </Typography>
        </Box>
        <Typography color="grey.400" textAlign="left" variant="body1" fontWeight={300}>
          10:29 am
        </Typography>
      </Box>
    </Box>
  );
}

function SendChatText({ message, time }: { message: string; time: string }) {
  return (
    <Box display="flex" width="100%" mb={3}>
      <Box width="100%" maxWidth={280} ml="auto">
        <Box mb={1} textAlign="left" bgcolor="grey.600" p="12px 16px 12px 16px" borderRadius="8px">
          <Typography color="grey.400" variant="body2">
            {message}
          </Typography>
        </Box>
        <Typography color="grey.400" textAlign="left" variant="body1" fontWeight={300}>
          {time}
        </Typography>
      </Box>
    </Box>
  );
}

interface ChatProp {
  id: number;
  message: string;
  time: string;
}

export default function ChatToConcierge() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState<string>('');
  const [myChats, setMyChats] = useState<ChatProp[]>([]);

  const sendMessage = (message: string) => {
    const date = new Date();
    const chat: ChatProp = {
      id: myChats.length + 1,
      message: message,
      time: `${Math.floor(date.getHours() / 12)}:${date.getMinutes()} ${
        date.getHours() >= 12 ? 'pm' : 'am'
      }`,
    };
    setMyChats([...myChats, chat]);
    const theElement = document.getElementById('chatView');

    const scrollToBottom = (node: any) => {
      node.scrollTop = node.scrollHeight;
    };

    scrollToBottom(theElement);
  };

  return (
    <Page title="Chat To Conceirge" img={isDesktop ? ChatToConceirgeBG : ''}>
      <Wrapper>
        <InnerWrapper>
          <Grid
            mb={{ xs: 3, sm: 3.5, md: 4 }}
            sx={{ display: 'flex', alignItems: 'center' }}
            container
          >
            <Grid textAlign="left" item xs={3}>
              {!isDesktop && (
                <ArrowBackIosIcon onClick={() => navigate(-1)} sx={{ fontSize: 'small' }} />
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h3">Chat to Concierge</Typography>
            </Grid>
          </Grid>
          <ChatView id="chatView">
            <RecieveChatText message="Hi Zayd, What do you need help with?" />
            {myChats.map((chat) => (
              <SendChatText key={chat.id} message={chat.message} time={chat.time} />
            ))}
          </ChatView>
          <Box pt={2}>
            <Box display="flex">
              {ChatSuggestions.map((sug) => (
                <CustomChip
                  key={sug.id}
                  sx={{ mb: 1 }}
                  label={sug.name}
                  onClick={() => sendMessage(sug.name)}
                />
              ))}
            </Box>
            <Box display="flex">
              <ChatInput
                placeholder="what do you need help with?"
                inputProps={{
                  style: {
                    padding: '11px 0px 11px 16px',
                    fontSize: '14px',
                  },
                }}
                InputProps={{
                  style: {
                    paddingRight: '5px',
                  },
                  endAdornment: (
                    <IconButton sx={{ p: 0 }}>
                      <AttachIcon />
                    </IconButton>
                  ),
                }}
                value={chatMessage}
                fullWidth
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage(chatMessage);
                    setChatMessage('');
                  }
                }}
              />
              <IconButton sx={{ p: 0, ml: 0.7 }}>
                <MicrophoneIcon />
              </IconButton>
            </Box>
          </Box>
        </InnerWrapper>
      </Wrapper>
    </Page>
  );
}
