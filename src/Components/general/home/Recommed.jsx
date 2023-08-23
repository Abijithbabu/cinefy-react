import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router";
import { timeAgo } from "../../../utils/functions";
import { getPosts } from "../../../redux/action";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const MachingCard = styled(Card)({
  minHeight: "30px",
  marginTop: "3px",
  paddingTop: "0.5px",
  paddingBottom: "px",
  minWidth: "0px",
  maxWidth: "350px",
  fill: "#EFEFEF",
  strokeWidth: "0.1px",
  stroke: "#A9A9A9",
});
const H2 = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  padding-Top: px;
  font-size: 20px;
  padding-left: 0px;
  color:"#000";
`;
const H1 = styled(Typography)({
  variant: "body1",
  color: "#000",
  paddingLeft: "1px",
  paddingTop: "1px",
  fontFamily: ['Poppins', 'sans-serif'].join(','),
  fontSize: "16px",

  fontWeight: "800px",
  lineHeight: "normal",
});

const H3 = styled(Typography)({
  variant: "body1",
  color: "#000",
  paddingLeft: "px",
  paddingRight: "px",
  paddingTop: "1px",
  fontSize: "14px",
  fontFamily: ['Poppins', 'sans-serif'].join(','),
});

const ImageSlot = styled(CardMedia)({
  minHeight: "1px",
  margin: "0px",
  marginTop: "0px",
  borderRadius: "2px",
  backgroundRepeat: "no-repeat, no-repeat",
  boxShadow: "0px 0px 1px 0px #07191D inset",
});

const CardTime = styled(Typography)({
  color: "#484848",
  textAlign: "right",

  fontSize: "11px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  padding: "3px 6px 0px 0px",
});

const Inner =styled(Box)({
    paddingRight:"15px",
})

function Recommed() {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const [data, setData] = React.useState([""]);
  React.useEffect(() => {
    try {
      const fetchData = async () => {
        await getPosts().then((res) => res && setData(res));
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  var settings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
    slickNext: false,
    slickPrevious: false,
    swipe: true,
    prevArrow: <div></div>,
    nextArrow: <div></div>,
  };

  return (
    <div>
        <Box sx={{ marginTop: "100px", marginBottom:"50px" }}>
      <H2 variant="h" component="h2" sx={{  marginBottom:"30px"}}>Recommed for you</H2>
      
        <Slider {...settings}>
          

          {data.map((card, index) => (
            <motion.div
              className="container"
              variants={container}
              initial="hidden"
              animate="visible"
              width={90}
              height={100}
            >
                <Inner>
              <MachingCard>
                
                <motion.div
                  className="item "
                  variants={item}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* <CardTime>{timeAgo(card.date)}</CardTime> */}
                  <ImageSlot
                    onClick={() => navigate(`/DetailPage?id=${card._id}`)}
                    key={`media-${card._id}`}
                    component="div"
                    sx={{
                      pt: "56.25%",
                      cursor: "pointer",
                    }}
                    image={card.image && `http://localhost:5000/${card.image}`}
                  />
                  <CardContent
                    onClick={() => navigate(`/DetailPage?id=${card._id}`)}
                    sx={{
                      flexGrow: 1,
                      cursor: "pointer",
                    }}
                  >
                    <H1>{card.title}</H1>
                    <H3 variant="body2" component="poppins">
                      role : {card.roles}
                    </H3>
                    <H3 variant="body2" component="poppins">
                      gender : {card.gender}{" "}
                    </H3>
                    <H3 variant="body2" component="poppins" marginBottom={1}>
                      {card.date}
                    </H3>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => setChecked(!checked)}
                      >
                        {checked ? (
                          <BookmarkIcon fontSize="small" />
                        ) : (
                          <BookmarkBorderIcon fontSize="small" />
                        )}
                      </IconButton>
                    </div>
                  </CardActions>
                </motion.div>
              </MachingCard>
              </Inner>
            </motion.div>
          ))}
        </Slider>
      </Box>
    </div>
  ); 
}

export default Recommed;
