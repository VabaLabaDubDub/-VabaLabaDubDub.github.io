package com.example.oceanicauthapp.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColors = darkColorScheme(
	primary = OceanPrimary,
	onPrimary = Color.White,
	primaryContainer = OceanPrimaryDark,
	onPrimaryContainer = Color.White,
	secondary = OceanTeal,
	onSecondary = Color.White,
	background = OceanDeep,
	surface = OceanDeep,
	onSurface = Color(0xFFE6F1F5)
)

private val LightColors = lightColorScheme(
	primary = OceanPrimary,
	onPrimary = Color.White,
	primaryContainer = OceanPrimaryLight,
	onPrimaryContainer = Color.White,
	secondary = OceanTeal,
	onSecondary = Color.White,
	background = Color(0xFFF4FBFE),
	surface = Color(0xFFF6FDFF),
	onSurface = Color(0xFF0D2B3A)
)

@Composable
fun OceanicTheme(darkTheme: Boolean = isSystemInDarkTheme(), content: @Composable () -> Unit) {
	val colorScheme = if (darkTheme) DarkColors else LightColors
	MaterialTheme(
		colorScheme = colorScheme,
		typography = Typography,
		content = content
	)
}