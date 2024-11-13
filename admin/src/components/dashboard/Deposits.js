import { Fragment, useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import axios from "axios";
import { getRevenue } from "../../state/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const dispatch = useDispatch();
  const { total, isLoading } = useSelector((store) => store.transactions);

  useEffect(() => {
    dispatch(getRevenue());
  }, []);

  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  });
  return (
    <Fragment>
      <Title>Total Revenue</Title>
      <Typography component="p" variant="h4">
        {total} USD
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {f.format(Date.now())}
      </Typography>
      <div>
        <Link href="/transactions">View Details</Link>
      </div>
    </Fragment>
  );
}
