package com.example.oceanicauthapp.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.oceanicauthapp.ui.screens.LoginScreen
import com.example.oceanicauthapp.ui.screens.RegisterScreen
import java.util.Locale

@Composable
fun AppNavGraph(
	currentLocale: Locale,
	onLocaleChange: (Locale) -> Unit
) {
	val navController = rememberNavController()
	NavHost(navController = navController, startDestination = Routes.Login.route) {
		composable(Routes.Login.route) {
			LoginScreen(
				onLoginSuccess = { navController.currentBackStackEntry?.let { } },
				onNavigateToRegister = { navController.navigate(Routes.Register.route) },
				currentLocale = currentLocale,
				onLocaleChange = onLocaleChange
			)
		}
		composable(Routes.Register.route) {
			RegisterScreen(onBack = { navController.popBackStack() }, currentLocale = currentLocale)
		}
	}
}