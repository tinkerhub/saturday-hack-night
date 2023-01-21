import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Html } from '@react-email/html';
import { Preview } from '@react-email/preview';
import { Text } from '@react-email/text';
import { Button } from '@react-email/button';
import { Section } from '@react-email/section';
import { Img } from '@react-email/img';

const main = {
    fontFamily: 'Clash Display, Arial, sans-serif',
    backgroundColor: '#0C0F17',
};
const container = {
    margin: '50px auto',
    border: '.5px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    padding: '24px',
};
const h1 = {
    color: 'white',
    fontWeight: 800,
    fontSize: '18px',
};
const body = {
    marginTop: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '18px',
    borderRadius: '8px',
};
const accent = {
    color: '#DBF72C',
};
const mainText = {
    color: 'white',
    fontSize: '55px',
    fontWeight: 600,
    lineHeight: '64px',
};
const textSeco = {
    color: 'white',
    fontSize: '18px',
    fontWeight: 400,
};
const btn = {
    backgroundColor: 'white',
    color: '#0C0F17',
    textDecoration: 'none',
    borderRadius: '10px',
    padding: '12px 24px',
    fontWeight: 500,
    fontSize: '18px',
};
const textTert = {
    color: 'white',
    fontSize: '17px',
    fontWeight: 400,
    marginTop: '18px',
    textDecoration: 'none',
};
const logo = {
    marginTop: '24px',
};

interface Props {
    teamID: string;
    inviteCode: string;
}

const Create = ({ teamID, inviteCode }: Props) => (
    <Html lang="en">
        <Head>
            <link
                href="https://fonts.cdnfonts.com/css/clash-display?styles=106288,106285,106286,106287,106289,106284"
                rel="stylesheet"
            />
            <style>
                ` @import
                url(https://fonts.cdnfonts.com/css/clash-display?styles=106288,106285,106286,106287,106289,106284);
                `
            </style>
        </Head>
        <Preview>Welcome to Saturday HackNight</Preview>
        <Section style={main}>
            <Container style={container}>
                <Text style={h1}>
                    SATURDAY
                    <br />
                    HACKNIGHT
                    <span style={accent}>.</span>
                </Text>
                <Container style={body}>
                    <Text style={mainText}>
                        <span style={accent}>Congratulations 🎉</span>
                        <br />
                        Your team has been created
                    </Text>
                    <Text style={textSeco}>
                        An Invitation mail to join the team has been send to all Team Members. If
                        they haven&apos;t received mail yet, share the link below.
                    </Text>
                    <Button
                        style={btn}
                        href={`https://hacknight.tinkerhub.org/join?invite=${inviteCode}`}
                    >
                        Invite Members
                    </Button>
                </Container>
                <Text style={textTert}>
                    Your Team ID is
                    <span style={accent}> {teamID}</span>
                </Text>
                <Text style={textTert}>
                    If you are having problem with the link above, try using this link to invite
                    your team members <br />
                    <a
                        style={accent}
                        href={`https://hacknight.tinkerhub.org/join?invite=${inviteCode}`}
                    >
                        https://hacknight.tinkerhub.org/join?invite={inviteCode}
                    </a>
                </Text>
                <Img
                    style={logo}
                    src="https://i.ibb.co/rv67kWJ/tinkerhub-logo.png"
                    width="137px"
                    height="41.27px"
                    alt="Tinkerhub Foundation"
                />
            </Container>
        </Section>
    </Html>
);

export default Create;
