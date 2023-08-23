'use client'

import ErrorPage from "@/components/ErrorPage"
import LoadPage from "@/components/LoadPage"
import SearchField from "@/components/SearchField"
import SingleRankGuild from "@/components/SingleRankGuild"
import SingleRankPlayer from "@/components/SingleRankPlayer"
import { getEntry, getGuildStats, getPlayerStats } from "@/redux/leaderboard"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


function SingleRank() {
    const params = useSearchParams()

    const dispatch = useDispatch()
    const searchResult = useSelector((state) => state.leaderboard.searchResult)
    const [searchElement, setSearchElement] = useState(<LoadPage />)

    useEffect(() => {

        async function handleUrlChange() {
            async function fetchSatats(playerId) {
                const data = await dispatch(getPlayerStats(playerId))
            }

            async function fetchGuildStats(guildId) {
                const data = await dispatch(getGuildStats(guildId))
            }

            const searchRes = await dispatch(getEntry(params.get('searchName')))
            if (searchRes.isPlayer) {
                fetchSatats(searchRes.id)
            }
            else {
                fetchGuildStats(searchRes.id)
            }
        }
        handleUrlChange()

    }, [window.location.href])

    useEffect(() => {
        if (searchResult) {
            setSearchElement(
                searchResult.isPlayer ?
                    <SingleRankPlayer searchData={searchResult} /> : <SingleRankGuild searchData={searchResult} />
            )
            if (searchResult.error === 'not-found') {
                setSearchElement(<ErrorPage message={searchResult.message} />)
            }
        }
    }, [searchResult])

    return (
        <>
            {searchResult ? searchResult.error !== 'not-found' ? <SearchField variation={'stats'} /> : <></> : <></>}
            {searchElement}
        </>
    )
}

export default SingleRank
