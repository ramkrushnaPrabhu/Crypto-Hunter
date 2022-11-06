import { makeStyles, Container, Typography } from '@material-ui/core'
import React from 'react';
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./Crypto4-1.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",

  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography variant='h2'
            style={{ fontweight: "bold", marginBottom: 15, fontFamily: "Montserrat" }}>CrypTo Hunter</Typography>

          <Typography variant="subtitle2" style={{
            color: "gold",
            textTransform: "capitalize",
            fontFamily: "Montserrat",
            fontWeight:"bold",
            textDecoration: "underline"
          }}>
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner

