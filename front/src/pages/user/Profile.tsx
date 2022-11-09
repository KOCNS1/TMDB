import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import {
  getRequestTokenFromTmdb,
  convertRequestTokenToAccessToken,
  verifyTmdbToken,
  unlinkTmdb,
} from "../../api/tmdb.api";
import { useStateContext } from "../../context/auth/auth.context";

type Props = {};

function Profile({}: Props) {
  const stateContext = useStateContext();

  const linkTmdbAccount = async () => {
    const { data, status } = await getRequestTokenFromTmdb();

    if (status === 201 && data) {
      window.open(data.url, "_blank");

      window.addEventListener("storage", async (event) => {
        if (event.key === "tmdb-request-token") {
          toast.promise(
            convertRequestTokenToAccessToken(data.request_token as string),
            {
              pending: "Linking TMDB account...",
              success: {
                render: () => {
                  stateContext.dispatch({
                    type: "SET_TMDB_TOKEN",
                    payload: {
                      authUser: stateContext.state.authUser,
                      tmdbToken: true,
                    },
                  });
                  return "Succes! Linked TMDB account!";
                },
              },
              error: "Something went wrong while linking TMDB account",
            }
          );

          window.removeEventListener("storage", () => {});
          window.localStorage.removeItem("tmdb-request-token");
        }
      });
    }
  };

  useQuery(["tmdb-token"], () => verifyTmdbToken(), {
    onSuccess: (data) => {
      stateContext.dispatch({
        type: "SET_TMDB_TOKEN",
        payload: {
          authUser: stateContext.state.authUser,
          tmdbToken: data.valid,
        },
      });
    },
  });

  const handleLogout = async () => {
    toast.promise(unlinkTmdb(), {
      pending: "Unlinking TMDB account...",
      error: "Error unlinking TMDB account",
      success: {
        render: () => {
          stateContext.dispatch({
            type: "SET_TMDB_TOKEN",
            payload: {
              authUser: stateContext.state.authUser,
              tmdbToken: false,
            },
          });
          return "TMDB account unlinked";
        },
      },
    });
  };

  return (
    <div>
      <h2 className="text-xl text-white font-bold my-6">My account</h2>

      <div className="divider"></div>
      <div className="flex justify-between">
        <div className="flex justify-start gap-5">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-white justify-center">
            <h5>{stateContext.state.authUser?.name}</h5>
            <p>{stateContext.state.authUser?.email}</p>
            {stateContext.state.tmdbToken ? (
              <div className="badge badge-success">TMDB account connected</div>
            ) : (
              <div className="badge badge-error">
                TMDB account not connected
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {stateContext.state.tmdbToken ? (
            <label htmlFor="my-modal" className="btn btn-outline btn-error">
              Unlink TMBD account
            </label>
          ) : (
            <button
              className="btn btn-outline btn-success"
              onClick={() => linkTmdbAccount()}
            >
              Link TMBD account
            </button>
          )}

          <input type="checkbox" id="my-modal" className="modal-toggle" />

          <div className="modal text-white">
            <div className="modal-box">
              <label
                htmlFor="my-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="font-bold text-lg">
                You are about to unlick your TMDB accout
              </h3>
              <p className="py-4">Are you sure you want to proceed ?</p>
              <div className="modal-action">
                <label
                  htmlFor="my-modal"
                  className="btn btn-error"
                  onClick={() => handleLogout()}
                >
                  Yes!
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default Profile;
