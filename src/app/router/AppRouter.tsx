import {useRoutes} from 'react-router-dom'
import {routeConfig} from 'app/config/routeConfig'
import {FC} from "react";

export const AppRouter: FC = () => {
    const element = useRoutes(routeConfig)

    return element
}
