package com.example.oceanicauthapp.ui.screens

import android.util.Patterns
import android.widget.Toast
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import com.example.oceanicauthapp.R
import com.example.oceanicauthapp.ui.components.AnimatedPrimaryButton
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginScreen(
	onLoginSuccess: () -> Unit,
	onNavigateToRegister: () -> Unit,
	currentLocale: Locale,
	onLocaleChange: (Locale) -> Unit
) {
	val context = LocalContext.current
	var email by rememberSaveable { mutableStateOf("") }
	var password by rememberSaveable { mutableStateOf("") }
	var emailError by remember { mutableStateOf<String?>(null) }
	var passwordError by remember { mutableStateOf<String?>(null) }
	var isSubmitting by remember { mutableStateOf(false) }

	val emailLabel = stringResource(id = R.string.email)
	val passwordLabel = stringResource(id = R.string.password)
	val loginText = stringResource(id = R.string.login)
	val registerText = stringResource(id = R.string.register)
	val forgotPassword = stringResource(id = R.string.forgot_password)
	val invalidEmail = stringResource(id = R.string.invalid_email)
	val passwordLengthError = stringResource(id = R.string.password_length_error)
	val loginSuccess = stringResource(id = R.string.login_success)
	val language = stringResource(id = R.string.language)

	Column(
		modifier = Modifier
			.fillMaxSize()
			.verticalScroll(rememberScrollState())
			.padding(horizontal = 24.dp)
			.navigationBarsPadding(),
		verticalArrangement = Arrangement.Center,
		horizontalAlignment = Alignment.CenterHorizontally
	) {
		Text(
			text = "Oceanic",
			style = MaterialTheme.typography.headlineLarge,
			color = MaterialTheme.colorScheme.primary
		)
		Spacer(Modifier.height(8.dp))
		Text(
			text = "Auth",
			style = MaterialTheme.typography.titleMedium,
			color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f)
		)

		Spacer(Modifier.height(24.dp))

		OutlinedTextField(
			value = email,
			onValueChange = { email = it; emailError = null },
			modifier = Modifier.fillMaxWidth(),
			label = { Text(emailLabel) },
			isError = emailError != null,
			shape = RoundedCornerShape(12.dp),
			keyboardOptions = KeyboardOptions.Default.copy(
				keyboardType = KeyboardType.Email,
				imeAction = ImeAction.Next
			)
		)
		AnimatedVisibility(visible = emailError != null, enter = fadeIn(), exit = fadeOut()) {
			Text(text = emailError ?: "", color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall)
		}

		Spacer(Modifier.height(12.dp))

		OutlinedTextField(
			value = password,
			onValueChange = { password = it; passwordError = null },
			modifier = Modifier.fillMaxWidth(),
			label = { Text(passwordLabel) },
			isError = passwordError != null,
			shape = RoundedCornerShape(12.dp),
			visualTransformation = PasswordVisualTransformation(),
			keyboardOptions = KeyboardOptions.Default.copy(
				keyboardType = KeyboardType.Password,
				imeAction = ImeAction.Done
			),
			keyboardActions = KeyboardActions(onDone = {
				performSubmit(
					email,
					password,
					invalidEmail,
					passwordLengthError,
					{ emailError = it },
					{ passwordError = it },
					{ isSubmitting = it },
					{
						Toast.makeText(context, loginSuccess, Toast.LENGTH_SHORT).show()
						onLoginSuccess()
					}
				)
			})
		)
		AnimatedVisibility(visible = passwordError != null, enter = fadeIn(), exit = fadeOut()) {
			Text(text = passwordError ?: "", color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall)
		}

		Spacer(Modifier.height(20.dp))

		AnimatedPrimaryButton(
			text = loginText,
			isLoading = isSubmitting,
			onClick = {
				performSubmit(
					email,
					password,
					invalidEmail,
					passwordLengthError,
					{ emailError = it },
					{ passwordError = it },
					{ isSubmitting = it },
					{
						Toast.makeText(context, loginSuccess, Toast.LENGTH_SHORT).show()
						onLoginSuccess()
					}
				)
			}
		)

		Spacer(Modifier.height(12.dp))

		AnimatedPrimaryButton(
			text = registerText,
			onClick = onNavigateToRegister
		)

		Spacer(Modifier.height(8.dp))
		TextButton(onClick = { /* Forgot password action hook */ }) {
			Text(forgotPassword)
		}

		Spacer(Modifier.height(16.dp))

		LanguageSelector(label = language, current = currentLocale, onChange = onLocaleChange)
	}
}

@Composable
private fun LanguageSelector(label: String, current: Locale, onChange: (Locale) -> Unit) {
	Column(modifier = Modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally) {
		Text(text = label, style = MaterialTheme.typography.labelLarge)
		Spacer(Modifier.height(8.dp))
		RowOfLocales(current = current, onChange = onChange)
	}
}

@Composable
private fun RowOfLocales(current: Locale, onChange: (Locale) -> Unit) {
	val locales = listOf(
		Locale.ENGLISH, // EN
		Locale("ru"),  // RU
		Locale("el"),  // GR (Greek)
		Locale("tl"),  // PH (Tagalog)
		Locale("in")   // IN (Indonesian, legacy tag per Android)
	)
	val labels = listOf("EN", "RU", "GR", "PH", "IN")
	androidx.compose.foundation.layout.Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
		locales.zip(labels).forEach { (loc, code) ->
			val selected = current.language == loc.language
			TextButton(onClick = { onChange(loc) }) {
				Text(text = code, color = if (selected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurface)
			}
		}
	}
}

private fun performSubmit(
	email: String,
	password: String,
	invalidEmailMsg: String,
	passwordLengthMsg: String,
	setEmailError: (String?) -> Unit,
	setPasswordError: (String?) -> Unit,
	setSubmitting: (Boolean) -> Unit,
	onSuccess: () -> Unit
) {
	var hasError = false
	if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
		setEmailError(invalidEmailMsg)
		hasError = true
	} else setEmailError(null)

	if (password.length < 6) {
		setPasswordError(passwordLengthMsg)
		hasError = true
	} else setPasswordError(null)

	if (!hasError) {
		setSubmitting(true)
		// Simulate network delay
		android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
			setSubmitting(false)
			onSuccess()
		}, 700)
	}
}