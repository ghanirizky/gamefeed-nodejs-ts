export interface CommandsProps {
  isSlash: boolean;
  msg?: any;
  interaction?: any;
}

export interface PruneCommandsProps extends CommandsProps {
  client: any;
}
