CREATE TABLE `table_habitacion` (
  `id` int(10) NOT NULL,
  `habitacionpiso` tinyint(2) NOT NULL DEFAULT 0,
  `habitacionnro` tinyint(2) NOT NULL DEFAULT 0,
  `cantcamas` tinyint(2) NOT NULL DEFAULT 0,
  `tienetelevision` tinyint(1) NOT NULL DEFAULT 0,
  `tienefrigobar` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `table_persona`
--

CREATE TABLE `table_persona` (
  `id` int(10) NOT NULL,
  `nombrecompleto` varchar(500) NOT NULL,
  `nrodocumento` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `table_reserva`
--

CREATE TABLE `table_reserva` (
  `id` int(10) NOT NULL,
  `fechareserva` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fechaentrada` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fechasalida` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `habitacionid` int(10) NOT NULL,
  `personaid` int(10) NOT NULL,
  `montoreserva` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `table_habitacion`
--
ALTER TABLE `table_habitacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `table_persona`
--
ALTER TABLE `table_persona`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `table_reserva`
--
ALTER TABLE `table_reserva`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `table_habitacion`
--
ALTER TABLE `table_habitacion`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `table_persona`
--
ALTER TABLE `table_persona`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `table_reserva`
--
ALTER TABLE `table_reserva`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
