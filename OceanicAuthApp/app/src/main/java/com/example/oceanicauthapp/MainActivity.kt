package com.example.oceanicauthapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalContext
import com.example.oceanicauthapp.ui.theme.OceanicTheme
import com.example.oceanicauthapp.navigation.AppNavGraph
import java.util.Locale
import android.content.res.Configuration

@Composable
private fun ProvideLocalizedResources(locale: Locale, content: @Composable () -> Unit) {
	val base = LocalContext.current
	val localizedContext = remember(locale) {
		val config = Configuration(base.resources.configuration)
		config.setLocale(locale)
		base.createConfigurationContext(config)
	}
	CompositionLocalProvider(LocalContext provides localizedContext) {
		content()
	}
}

class MainActivity : ComponentActivity() {
	override fun onCreate(savedInstanceState: Bundle?) {
		super.onCreate(savedInstanceState)
		setContent {
			OceanicTheme {
				var currentLocale by rememberSaveable { mutableStateOf(Locale.ENGLISH) }
				ProvideLocalizedResources(currentLocale) {
					AppNavGraph(
						currentLocale = currentLocale,
						onLocaleChange = { newLocale -> currentLocale = newLocale }
					)
				}
			}
		}
	}
}